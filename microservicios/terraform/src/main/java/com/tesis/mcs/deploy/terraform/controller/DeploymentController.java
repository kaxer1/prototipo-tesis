package com.tesis.mcs.deploy.terraform.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
public class DeploymentController {

    @Value("${path.terraform.deploy}")
    private String pathTerraformDeploy;

    @PostMapping("/deploy")
    public String deployInfrastructure(@RequestParam String subdominio) throws IOException, InterruptedException {
        // Ejecuta el script de Terraform
        ProcessBuilder processBuilder = new ProcessBuilder();

        processBuilder.command("terraform", "apply", "-auto-approve");

        // Crea un nuevo directorio para ejecutar Terraform
        processBuilder.directory(new File(pathTerraformDeploy));

        // Inicia el proceso y espera a que termine
        Process process = processBuilder.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        StringBuilder output = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }
        process.waitFor();

        // Devuelve la salida del proceso
        return output.toString();
    }

}
