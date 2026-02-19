package com.stiwarback.stiwarback.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.stiwarback.stiwarback.entity.Residuo;
import com.stiwarback.stiwarback.entity.ResiduoStatus;
import com.stiwarback.stiwarback.repository.ResiduoRepository;

@Service
public class ResiduoServiceImpl implements ResiduoService {

    private final ResiduoRepository residuoRepository;

    public ResiduoServiceImpl(ResiduoRepository residuoRepository) {
        this.residuoRepository = residuoRepository;
    }

    @Override
    public Residuo createResiduo(Residuo residuo) {
        residuo.setStatus(ResiduoStatus.PENDIENTE);
        return residuoRepository.save(residuo);
    }

    @Override
    public List<Residuo> getAllResiduos() {
        return residuoRepository.findAll();
    }

    @Override
    public void deleteResiduo(int id) {
        Residuo residuo = residuoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe el residuo"));
        residuoRepository.delete(residuo);
    }

    @Override
    public Residuo updateResiduo(int id, Residuo residuo) {
        Residuo existingResiduo = residuoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe el residuo"));

        existingResiduo.setDescription(residuo.getDescription());
        existingResiduo.setType(residuo.getType());
        existingResiduo.setLocation(residuo.getLocation());
        existingResiduo.setVolumen(residuo.getVolumen());
        existingResiduo.setStatus(residuo.getStatus());

        return residuoRepository.save(existingResiduo);
    }

    @Override
    public List<Residuo> getByStatus(ResiduoStatus status) {
        return residuoRepository.findByStatus(status);
    }

    @Override
    public Map<String, Long> getVolumenPorTipo() {
        return residuoRepository.countByType().stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }

    @Override
    public boolean hayAlertaPorTipo(String type, long limite) {
        long count = residuoRepository.countByTypeAndStatus(type, ResiduoStatus.PENDIENTE);
        return count >= limite;
    }
}
