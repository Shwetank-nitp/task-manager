export type Tasks = {
  _id: string;
  title: string;
  description: string;
  due: string;
  status: "pending" | "in progress" | "completed" | "expired";
  createdAt: string;
};
