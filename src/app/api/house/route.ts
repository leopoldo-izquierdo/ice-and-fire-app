import { HouseData, CharacterData } from "@/interfaces";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  const res = await fetch(`https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) {
    console.log("error");
    return NextResponse.error();
  }
  const data: HouseData[] = await res.json();

  const swornMembersPromises = data.map(async (house) => {
    const swornMembersUrls: string[] = house.swornMembers;
    const swornMembersResponses = await Promise.all(swornMembersUrls.map((url) => fetch(url)));

    const successfulResponses = swornMembersResponses.every((response) => response.ok);
    if (!successfulResponses) {
      throw new Error(`Failed to fetch sworn members for the house: ${house.name}`);
    }

    const swornMembers: CharacterData[] = await Promise.all(swornMembersResponses.map((response) => response.json()));
    const formattedSwornMembers = swornMembers.map((elem: CharacterData) => ({
      url: elem.url,
      name: elem.name,
      lifeStatus: elem.died ? elem.died : "Is Alive",
    }));
    return { ...house, swornMembers: formattedSwornMembers };
  });

  const allData = await Promise.all(swornMembersPromises);

  const formattedResponse: any = allData.map((elem: any) => ({
    url: elem.url,
    name: elem.name,
    region: elem.region,
    coatOfArms: elem.coatOfArms,
    titles: elem.titles,
    seats: elem.seats,
    swornMembers: elem.swornMembers,
  }));
  
  return NextResponse.json(formattedResponse);
}
