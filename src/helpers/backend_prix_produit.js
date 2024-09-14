import { del, get, post, put } from "./api_helper";

export const getPrixProduitBackend = () => get('/produit-prefecture');
export const getPrixProduitNoPaginateBackend = () => get('produit-prefecture/no-paginate');
export const postPrixProduitBackend = (produit) => post('/produit-prefecture',produit);
export const getPrixDesProduitBackend = (produit_ids) => get(`/produit-prefecture/list-produits/${produit_ids}`) ;
export const getStatsProduits = (periode, id=0, regId=0, ordering=false) => get(`produit-prefecture/stats-produits/${periode}/${regId}/${id}-${ordering}`);
export const getShowPrixProduitBackend = (id) => get(`/produit-prefecture/${id}`);
export const putPrixProduitBackend = (id, produit) => put(`/produit-prefecture/${id}`,produit);
export const deletePrixProduitBackend = (id) => del(`/produit-prefecture/${id}`);
