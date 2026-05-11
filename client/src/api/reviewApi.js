import { api } from "./api"

export const addReview=(id,data)=>{
    return api.post(`/reviews/add-review/${id}`,data,{showSuccessToast: true})
}

export const getReview=(id)=>{
    return api.get(`/reviews/get-review/${id}`)
}

export const updateReview=(id,data)=>{
    return api.put(`/reviews/edit-review/${id}`,data)
}

export const deleteReview=(id)=>{
    return api.delete(`/reviews/remove-review/${id}`)
}