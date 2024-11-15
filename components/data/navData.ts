// data/navData.ts

interface NavItem {
    title: string;
    url: string;
    subcategories?: {
        title: string;
        url: string;
    }[];
}

interface NavData {
    navMain: NavItem[];
}

export const navData: NavData = {
    navMain: [
        {
            title: "Tech and Gadgets",
            url: "/tech-gadgets",
            subcategories: [
                {
                    title: "Mobile Phones",
                    url: "/tech-gadgets/mobilephones",
                },
                {
                    title: "Laptops and Computers",
                    url: "/tech-gadgets/laptops-computers",
                },
                {
                    title: "Smartwatches",
                    url: "/tech-gadgets/smartwatches",
                },
                {
                    title: "Audio and Headphones",
                    url: "/tech-gadgets/audio-headphones",
                },
            ],
        },
        {
            title: "Beauty and Skincare",
            url: "/beauty-skincare",
            subcategories: [
                {
                    title: "Skincare Essentials",
                    url: "/beauty-skincare/skincareessentials",
                },
                {
                    title: "Makeup Tools & Kits",
                    url: "/beauty-skincare/makeups",
                },
                {
                    title: "Anti-Aging Products",
                    url: "/beauty-skincare/anti-aging",
                },
                {
                    title: "Hair Care",
                    url: "/beauty-skincare/haircare",
                },
            ],
        },
        // {
        //     title: "Fashion and Accessories",
        //     url: "/fashion&accessories",
        //     subcategories: [
        //         {
        //             title: "Clothing",
        //             url: "/fashion&accessories/clothing",
        //         },
        //         {
        //             title: "Footwear",
        //             url: "/fashion&accessories/footwear",
        //         },
        //         {
        //             title: "Jewelry & Watches",
        //             url: "/fashion&accessories/jewelry&watches",
        //         },
        //         {
        //             title: "Bags & Wallets",
        //             url: "/fashion&accessories/bags&wallets",
        //         },
        //     ],
        // },
        // {
        //     title: "Health and Fitness",
        //     url: "#",
        //     subcategories: [
        //         {
        //             title: "Fitness Equipment",
        //             url: "#",
        //         },
        //         {
        //             title: "Supplements & Vitamins",
        //             url: "#",
        //         },
        //         {
        //             title: "Wearable Tech",
        //             url: "#",
        //         },
        //         {
        //             title: "Yoga & Meditation",
        //             url: "#",
        //         },
        //     ],
        // },
        // {
        //     title: "Home and Kitchen Appliances",
        //     url: "#",
        //     subcategories: [
        //         {
        //             title: "Kitchen Appliances",
        //             url: "#",
        //         },
        //         {
        //             title: "Home Essentials",
        //             url: "#",
        //         },
        //         {
        //             title: "Cleaning Supplies",
        //             url: "#",
        //         },
        //         {
        //             title: "Smart Home Devices",
        //             url: "#",
        //         },
        //     ],
        // },

    ],
};
