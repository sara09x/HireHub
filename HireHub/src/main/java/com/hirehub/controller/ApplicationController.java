
package com.hirehub.controller;

import com.hirehub.entity.Application;
import com.hirehub.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/applications")

public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService
    ) {

        this.applicationService = applicationService;
    }

    @PostMapping("/apply")
    public Application applyToJob(

            @RequestParam long userId,
            @RequestParam long jobId

    ) {

        return applicationService.applyToJob(
                userId,
                jobId
        );
    }
    @PostMapping("/upload-cv/{applicationId}")
    public String uploadCv(
            @PathVariable Long applicationId
    ) {

        return "CV uploaded successfully";
    }
}