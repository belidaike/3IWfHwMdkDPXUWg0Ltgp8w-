// import { getCourses } from "@/actions/get-courses"
// export default async function sitemap() {



// const getCourse = await getCourses({})

// const courses = getCourse?.map((course: any) => {
//     return {
//         url: `https://nizzyabi.com/courses/${course?.id}/info`,
//         lastModified: course?.createdAt
//     }
// })
// return [{
//     url: 'nizzyabi.com',
//     lastModified: new Date()
// },
// ...courses
// ]
// return 'asd'
// }
import { fetchAllPostItems } from "@/lib/postItem";

export default async function sitemap() {
    const baseUrl = "https://5hop5martly.vercel.app";

    // Fetch all post items
    const items = await fetchAllPostItems();

    // Map post items to sitemap URLs
    const itemsUrls = items.map((item) => ({
        url: `${baseUrl}/tech-gadgets/${item.category || "default-category"}/${item._id}`,

        lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
    }));

    // Return the sitemap
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...itemsUrls,
    ];
}
