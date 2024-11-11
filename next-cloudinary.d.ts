declare module 'next-cloudinary' {
    export const ImageResponse: {
        upload: (file: File, options?: { folder: string }) => Promise<{ secure_url: string }>;
    };
}