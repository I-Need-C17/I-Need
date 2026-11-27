package it.unisa.ineed.collaudo;

public class ClassificatorePriorita {

    private ClassificatorePriorita() {
    }

    public enum Priorita {
        NORMALE,
        ALTA
    }

    public static Priorita classifica(int punteggio) {
        if (punteggio < 0 || punteggio > 10) {
            throw new IllegalArgumentException();
        }

        return punteggio <= 6 ? Priorita.NORMALE : Priorita.ALTA;
    }
}
