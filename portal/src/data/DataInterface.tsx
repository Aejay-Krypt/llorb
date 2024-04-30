export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  role: string;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  label: string;
  status: string;
  userId: string;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface Comment {
  id?: string;
  remark: string;
  taskId: string;
  userId: string;
  dateCreated?: string;
  dateUpdated?: string;
}
