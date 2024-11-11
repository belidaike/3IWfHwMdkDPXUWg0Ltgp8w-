
import { useEffect, useState } from "react";

// Define the type for a conversation item
interface Conversation {
	_id: string;
	// Add other properties based on the data structure returned from the API
}

const useGetConversations = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [conversations, setConversations] = useState<Conversation[]>([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();

				if (data.error) {
					throw new Error(data.error);
				}

				setConversations(data);
			} catch (error: any) {
				// toast.error(error.message);

				console.log(error)
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
