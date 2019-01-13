export interface PostModel {
    postId: number;
    projectId: string;
    description: string;
    createdDate: Date;
    user: string;
    attachments: AttachmentModel[];
    //comments: PostModel[];
}

export interface AttachmentModel {
    fileName: string;
    fileType: string;
    fileUrl: string;
    fileLocation: string;
}