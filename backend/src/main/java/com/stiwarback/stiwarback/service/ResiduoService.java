package com.stiwarback.stiwarback.service;

import java.util.List;
import java.util.Map;

import com.stiwarback.stiwarback.entity.Residuo;
import com.stiwarback.stiwarback.entity.ResiduoStatus;

public interface ResiduoService {

    Residuo createResiduo(Residuo residuo);

    List<Residuo> getAllResiduos();

    void deleteResiduo(int id);

    Residuo updateResiduo(int id, Residuo residuo);

    List<Residuo> getByStatus(ResiduoStatus status);

    Map<String, Long> getVolumenPorTipo();

    boolean hayAlertaPorTipo(String type, long limite);
}
