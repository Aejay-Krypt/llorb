package broll.taskmaster.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SuccessStructure {
    private int code = 200;
    private Object data;
    private String message = "success";

    public SuccessStructure(Object data){
        this.data = data;
    }

    SuccessStructure(int code, Object data){
        this.code = code;
        this.data = data;
    }

    public SuccessStructure(Object data, String message){
        this.data = data;
        this.message = message;
    }
}