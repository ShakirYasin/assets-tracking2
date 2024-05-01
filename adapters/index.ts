import { db } from "@/lib/db"
import { seaRatesApi } from "@/shippingApis"
import { ApiResponse } from "@/types"
import { Shipment, Vessel } from "@prisma/client"
import axios, { AxiosResponse } from "axios"



export const searatesAdapter = async (payload: { carrier: string, tracking_number: string, userId: number }) => {
    const { carrier, tracking_number, userId } = payload
    // const url = getCarrierUrl(carrier, number)

    const res: AxiosResponse<ApiResponse> = await seaRatesApi(tracking_number)
    if (res.data.status === "success") {
        const metadata = res.data.data.metadata
        const vesselData = res.data.data.vessels.map((ves) => { return { name: ves.name, flag: ves.flag, fid: ves.id } })
        const data = { type: metadata.type, carrier: carrier, name: metadata.sealine_name, status: metadata.status, userId: userId, tracking_number, arrivalTime: res.data.data.route.pod.date }
        if (vesselData.length) {

            const ship = await db.shipment.create({ data: { ...data, vessels: { create: vesselData } } })
            return ship
        }
        const ship = await db.shipment.create({ data: { ...data } })

        // if (ship.status !== "DELIVERED") {


        // }
        return ship

    }
    return null
}


export const adapterHandler = async (option: string, payload: { carrier: string, tracking_number: string, userId: number }) => {
    switch (option) {
        case "SEARATE":
            return await searatesAdapter(payload)
    }

}