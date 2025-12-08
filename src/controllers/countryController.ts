import { Request, Response } from "express";

export const getDummyCountries = async (req: Request, res: Response) => {
    try {
        const countries = [
            {
                id: 1,
                name: "India",
                code: "IN",
                phoneCode: "+91",
                flag: "https://dummyflags.com/in.png",
                currency: "INR",
                region: "Asia"
            },
            {
                id: 2,
                name: "United States",
                code: "US",
                phoneCode: "+1",
                flag: "https://dummyflags.com/us.png",
                currency: "USD",
                region: "North America"
            },
            {
                id: 3,
                name: "United Kingdom",
                code: "UK",
                phoneCode: "+44",
                flag: "https://dummyflags.com/uk.png",
                currency: "GBP",
                region: "Europe"
            },
            {
                id: 4,
                name: "United Arab Emirates",
                code: "AE",
                phoneCode: "+971",
                flag: "https://dummyflags.com/ae.png",
                currency: "AED",
                region: "Middle East"
            },
            {
                id: 5,
                name: "Australia",
                code: "AU",
                phoneCode: "+61",
                flag: "https://dummyflags.com/au.png",
                currency: "AUD",
                region: "Oceania"
            }
        ];

        res.json({
            success: true,
            count: countries.length,
            countries
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err });
    }
};
