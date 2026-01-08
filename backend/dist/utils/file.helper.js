export const FILE_TYPES = {
    image: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
    document: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    video: ["video/mp4", "video/mkv", "video/webm"],
    audio: ["audio/mpeg", "audio/mp3", "audio/wav"],
};
export const MAX_FILE_SIZE = {
    image: 2 * 1024 * 1024, // 2MB
    document: 5 * 1024 * 1024, // 5MB
    video: 50 * 1024 * 1024, // 50MB
    audio: 10 * 1024 * 1024, // 10MB
};
