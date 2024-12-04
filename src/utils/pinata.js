import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});


export async function uploadFilePinata(pdfFile) {
    try {
        if (pdfFile.type !== "application/pdf") {
            throw new Error("The provided file is not a PDF.");
        }
        const upload = await pinata.upload.file(pdfFile);
        console.log(upload);
        return upload.cid;

    } catch (error) {
        console.log(error);
    }
}

export async function retrieveFilePinata(cid) {
    try {
        const data = await pinata.gateways.get(cid);
        console.log(data)

        const url = await pinata.gateways.createSignedURL({
            cid: cid,
            expires: 1800,
        })
        console.log(url);
        return url;

    } catch (error) {
        console.log(error);
    }
}

export async function uploadJsonPinata(json) {
    try {
        const upload = await pinata.upload.json(json);
        console.log(upload);
        return upload.cid;

    } catch (error) {
        console.log(error);
    }
}

export async function retrieveJsonPinata(cid) {
    try {
        const data = await pinata.gateways.get(cid);
        console.log(data)

        const url = await pinata.gateways.createSignedURL({
            cid: cid,
            expires: 1800,
        })
        console.log(url);
        return url;

    } catch (error) {
        console.log(error);
    }
}
