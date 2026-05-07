import * as AdminServices from "../services/admin.service.js";
import { response } from "../utils/response.util.js";
import { messages } from "../messages/index.js";

export const adminDashboard=async (req, res,next) => {
  try {
    const data = await AdminServices.getDashboardStats();
    return response(res,{
      statusCode:200,
      data
    })
  } catch (err) {
    // console.error("DASHBOARD ERROR:", err);
    // res.status(500).json({ message: "Server error" });
    return next(err)
  }
}


export const getAllOrders = async (req, res, next) => {
  try {
    const data = await AdminServices.getOrders()

    // res.json(orders);
    return response(res,{
      statusCode:200,
      data
    })
  } catch (err) {
    // res.status(500).json({ message: err.message });
    return next(err)
  }
};


export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await AdminServices.changeOrderStatus(id,status)

    // res.status(200).json({
    //   success: true,
    //   message: "Order updated successfully",
    //   data: order
    // });
    return response(res,{
      statusCode:200,
      message:messages.order.ORDER_UPDATED
    })

  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message
    // });
    return next(err)
  }
};

export const updatePaymentStatus = async(req,res,next)=>{
  try {
    const {id}= req.params;
    const {paymentStatus}=req.body;
    await AdminServices.changePaymentStatus(id,paymentStatus)
    // res.status(200).json({message:"Status Updated successfully"})
    return response(res,{
      statusCode:200,
      message:messages.general.SUCCESS
    })

  } catch (err) {
    // res.status(500).json({message:error.message})
    return next(err)
  }
}




export const getAllUsersDetails = async(req,res,next)=>{
  try {
    const data=await AdminServices.getUsers()
    // return res.status(200).json(data)
    return response(res,{
      statusCode:200,
      data
    })
  } catch (err) {
    // return res.status(500).json({message:error.message})
    return next(err)
  }
}

export const deleteUser = async(req,res,next)=>{
  try {
    await AdminServices.removeUser(req.params.id)


    // return res.status(200).json({message:"User has been deleted"})
    return response(res,{
      statusCode:200,
      message:messages.general.SUCCESS
    })
  } catch (err) {
    // return res.status(500).json({message:error.message})
    return next(err)
  }
}

export const updateRole=async(req,res,next)=>{
  try {
    const {id}=req.params
    const data=req.body
    const myData=await AdminServices.changeUserRole(id,data)
  // return res.status(200).json(myData)
    return response(res,{
      statusCode:200,
      data:myData
    })
  } catch (err) {
    // return res.status(500).json({message:error.message})
    return next(err)
  }
}



// 🆚 Two approaches  used
// 1️⃣ Direct update (your updateRole)
// await User.update({ role }, { where: { id } });
// 2️⃣ Fetch → modify → save (your updatePaymentStatus)
// const order = await Order.findByPk(id);
// order.paymentStatus = paymentStatus;
// await order.save();