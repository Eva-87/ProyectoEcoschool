package com.stiwarback.stiwarback.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.stiwarback.stiwarback.entity.Residuo;
import com.stiwarback.stiwarback.entity.ResiduoStatus;
import com.stiwarback.stiwarback.service.ResiduoService;

@RestController
@RequestMapping("/api/residuos")
@CrossOrigin(origins = "http://localhost:5173")
public class ResiduoController {

    private final ResiduoService residuoService;

    public ResiduoController(ResiduoService residuoService) {
        this.residuoService = residuoService;
    }

    // Obtener todos los residuos
    @GetMapping
    public List<Residuo> getAll() {
        return residuoService.getAllResiduos();
    }

    // Crear residuo SIN usuarios
    @PostMapping
    public Residuo crearResiduo(@RequestBody Residuo residuo) {
    return residuoService.createResiduo(residuo);
}


    // Obtener residuos por estado
    @GetMapping("/status/{status}")
    public List<Residuo> getByStatus(@PathVariable ResiduoStatus status) {
        return residuoService.getByStatus(status);
    }

    // Actualizar residuo
    @PutMapping("/{id}")
    public Residuo updateResiduo(@PathVariable int id,
                                 @RequestBody Residuo residuo) {
        return residuoService.updateResiduo(id, residuo);
    }

    // Eliminar residuo
    @DeleteMapping("/{id}")
    public void deleteResiduo(@PathVariable int id) {
        residuoService.deleteResiduo(id);
    }

    // Estadísticas por tipo
    @GetMapping("/estadisticas/por-tipo")
    public Map<String, Long> volumenPorTipo() {
        return residuoService.getVolumenPorTipo();
    }

    // Alertas por tipo
    @GetMapping("/alertas/{type}")
    public boolean alertaPorTipo(@PathVariable String type,
                                 @RequestParam(defaultValue = "10") long limite) {
        return residuoService.hayAlertaPorTipo(type, limite);
    }
}
