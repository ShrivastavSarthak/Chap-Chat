import { connectDB } from "@/src/utils/services/db_service/connectDb";
import client from "@/src/utils/services/db_service/db.service";
import { NextRequest } from "next/server";



export async function POST(req:NextRequest) {
    try {
        await connectDB();
        
    } catch (error) {
        
    }
}