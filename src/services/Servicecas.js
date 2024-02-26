import axios from "axios";

export const GraphApi = axios.create({
  baseURL: "http://localhost:8080"
})

export const getAllGraph = ()=>{
    return GraphApi.get('/graph')
}

export const SaveGraph = (graph)=>{
    return GraphApi.post('/graph', graph)
}

export const UpdatedGraph = (graph)=>{
    return GraphApi.put(`/graph/${graph.id}`, graph)
}

export const DeleteGraph = (graph)=>{
    return GraphApi.delete(`/graph/${graph.id}`)
}