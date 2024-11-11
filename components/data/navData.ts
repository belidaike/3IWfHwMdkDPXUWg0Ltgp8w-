// data/navData.ts

interface NavItem {
    title: string;
    url: string;
    items?: {
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
            title: "Beauty and Skincare",
            url: "/beauty&skincare",
            items: [
                {
                    title: "Skincare Essentials",
                    url: "/beauty&skincare/skincareessentials",
                },
                {
                    title: "Makeup Tools & Kits",
                    url: "/beauty&skincare/makeups",
                },
                {
                    title: "Anti-Aging Products",
                    url: "/beauty&skincare/anti-aging",
                },
                {
                    title: "Hair Care",
                    url: "/beauty&skincare/haircare",
                },
            ],
        },
        {
            title: "Fashion and Accessories",
            url: "/fashion&accessories",
            items: [
                {
                    title: "Clothing",
                    url: "/fashion&accessories/clothing",
                },
                {
                    title: "Footwear",
                    url: "/fashion&accessories/footwear",
                },
                {
                    title: "Jewelry & Watches",
                    url: "/fashion&accessories/jewelry&watches",
                },
                {
                    title: "Bags & Wallets",
                    url: "/fashion&accessories/bags&wallets",
                },
            ],
        },
        {
            title: "Health and Fitness",
            url: "#",
            items: [
                {
                    title: "Fitness Equipment",
                    url: "#",
                },
                {
                    title: "Supplements & Vitamins",
                    url: "#",
                },
                {
                    title: "Wearable Tech",
                    url: "#",
                },
                {
                    title: "Yoga & Meditation",
                    url: "#",
                },
            ],
        },
        {
            title: "Home and Kitchen Appliances",
            url: "#",
            items: [
                {
                    title: "Kitchen Appliances",
                    url: "#",
                },
                {
                    title: "Home Essentials",
                    url: "#",
                },
                {
                    title: "Cleaning Supplies",
                    url: "#",
                },
                {
                    title: "Smart Home Devices",
                    url: "#",
                },
            ],
        },
        {
            title: "Tech and Gadgets",
            url: "#",
            items: [
                {
                    title: "Mobile Phones",
                    url: "#",
                },
                {
                    title: "Laptops & Computers",
                    url: "#",
                },
                {
                    title: "Smartwatches",
                    url: "#",
                },
                {
                    title: "Audio & Headphones",
                    url: "#",
                },
            ],
        },
    ],
};
