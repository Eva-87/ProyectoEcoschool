

package com.stiwarback.stiwarback;

import java.util.List;
import lombok.Data;

@Data
public class UserCreateRequest {
    private String name;
    private String email;
    private String classroom;
    private List<Integer> rolesIds;
}
