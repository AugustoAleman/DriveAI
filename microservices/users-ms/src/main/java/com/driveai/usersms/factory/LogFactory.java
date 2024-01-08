package com.driveai.usersms.factory;

import com.driveai.usersms.model.Log;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class LogFactory {

    public static Log createLog(int userId, String title, String description, String action, String statusCode, String modifiedBy, String exception) {
        Log log = new Log();
        log.setUserId(userId);
        log.setTitle(title);
        log.setDescription(description);
        log.setAction(action);
        log.setStatusCode(statusCode);
        log.setCreatedAt(new Date());
        log.setModifiedBy(modifiedBy);
        log.setException(exception);
        return log;
    }
}
