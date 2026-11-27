package it.unisa.ineed.collaudo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class ClassificatorePrioritaTest {

    @Test
    void SIM_TF_01_inputMenoUnoLanciaIllegalArgumentException() {
        assertThrows(
            IllegalArgumentException.class,
            () -> ClassificatorePriorita.classifica(-1)
        );
    }

    @Test
    void SIM_TF_02_inputZeroRestituisceNormale() {
        assertEquals(
            ClassificatorePriorita.Priorita.NORMALE,
            ClassificatorePriorita.classifica(0)
        );
    }

    @Test
    void SIM_TF_03_inputTreRestituisceNormale() {
        assertEquals(
            ClassificatorePriorita.Priorita.NORMALE,
            ClassificatorePriorita.classifica(3)
        );
    }

    @Test
    void SIM_TF_04_limiteSeiRestituisceNormale() {
        assertEquals(
            ClassificatorePriorita.Priorita.NORMALE,
            ClassificatorePriorita.classifica(6)
        );
    }

    @Test
    void SIM_TF_05_limiteSetteRestituisceNormale() {
        assertEquals(
            ClassificatorePriorita.Priorita.NORMALE,
            ClassificatorePriorita.classifica(7)
        );
    }

    @Test
    void SIM_TF_06_inputNoveRestituisceAlta() {
        assertEquals(
            ClassificatorePriorita.Priorita.ALTA,
            ClassificatorePriorita.classifica(9)
        );
    }

    @Test
    void SIM_TF_07_limiteDieciRestituisceAlta() {
        assertEquals(
            ClassificatorePriorita.Priorita.ALTA,
            ClassificatorePriorita.classifica(10)
        );
    }

    @Test
    void SIM_TF_08_inputUndiciLanciaIllegalArgumentException() {
        assertThrows(
            IllegalArgumentException.class,
            () -> ClassificatorePriorita.classifica(11)
        );
    }

    @Test
    void SIM_TF_09_limiteOttoRestituisceAlta() {
        assertEquals(
            ClassificatorePriorita.Priorita.ALTA,
            ClassificatorePriorita.classifica(8)
        );
    }
}
