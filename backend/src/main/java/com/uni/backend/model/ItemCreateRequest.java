package com.uni.backend.model;

public class ItemCreateRequest {
    private String nombre;
    private String grupo;

    public ItemCreateRequest() {}
    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}
    public String getGrupo() {return grupo;}
    public void setGrupo(String grupo) {this.grupo = grupo;}

}
