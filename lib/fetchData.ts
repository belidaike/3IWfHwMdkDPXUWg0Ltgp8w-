import { useEffect, useState } from "react"

interface PostItem {
    _id: string;
    pname: string;
    brand: string;
    category: string;
    description: string;
    price: string;
    alink: string;
    img: string;
}

const useGetPostItems = (category: string) => {
    const [loading, setLoading] = useState(false)
    const [postItems, setPostItems] = useState<PostItem[]>([]);


    useEffect(() => {
        const getPostItems = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/postitems?category=${category}`)
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                setPostItems(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getPostItems()
    }, [category])

    return { loading, postItems }
}

export default useGetPostItems
