export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  senderName?: string;
  content: string;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageData {
  chatId: string;
  content: string;
  type?: 'text' | 'image' | 'file';
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: Message;
}


