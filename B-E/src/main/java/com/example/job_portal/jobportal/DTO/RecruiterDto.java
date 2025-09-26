package com.example.job_portal.jobportal.DTO;

public class RecruiterDto {
    private Long id;
    private String name;
    private String position;
    private String stage;
    

    public RecruiterDto(Long id, String name, String position, String stage) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.stage = stage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }


}
