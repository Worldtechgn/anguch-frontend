import { del, get, post, put } from "./api_helper";

export const getProduitBackend = () => get('/produits');
export const postProduitBackend = (produit) => post('/produits',produit);
export const getShowProduitBackend = (id) => get(`/produits/${id}`);
export const putProduitBackend = (id, produit) => put(`/produits/${id}`,produit);
export const deleteProduitBackend = (id) => del(`/produits/${id}`);
