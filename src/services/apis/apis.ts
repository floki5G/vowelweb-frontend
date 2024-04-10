import { ICategories, IProducts } from "../../redux/types/common";
import axiosApiCaller from "../AxiosInstance";

export async function PostCategoryApi(payload: ICategories) {
  try {
    const response = await axiosApiCaller.post("/admin/category/upsert", payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postProductApi(payload: IProducts) {
  try {
    const response = await axiosApiCaller.post("/admin/product/upsert", payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postCategoryProductApi() {
  try {
    const response = await axiosApiCaller.post("/admin/category-product/upsert");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMenuApi() {
  try {
    const response = await axiosApiCaller.get("/admin/menu");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export interface IOrder {  amount:number
  first_name:string
  last_name:string
  email:string
  phone_no:string
  shipping_address:string
  address_line:string
  city:string
  state:string
  zipcode:string
}
export async function PostOrderApi(payload:IOrder) {
  try {
    const response = await axiosApiCaller.post("/admin/order", payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function PostPaymentCaptureApi(payload: {
  orderCreationId: string,
  razorpayPaymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string,
}) {
  try {
    const response = await axiosApiCaller.post("/admin/payment-capture", payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getOrdersApi() {
  try {
    const response = await axiosApiCaller.get("/admin/orders");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}