# 📐 Cálculo Integral - Presentación Interactiva

Bienvenido al repositorio de la **Presentación Interactiva de Cálculo Integral**. Este proyecto es una Single Page Application (SPA) en Vanilla Javascript orientada a desglosar de forma pedagógica, visual y ultra-detallada diversos ejercicios de cálculo diferencial e integral avanzado.

### 🌐 Demo en Vivo
Puedes acceder y navegar esta presentación hospedada de forma permamente a través de Firebase Hosting aquí:
**[https://calculointegralwild.web.app/](https://calculointegralwild.web.app/)**

## ✨ Características Principales

*   **Tema UI Premium "Glassmorphism":** Interfaz moderna y minimalista con estética de desenfoques y contrastes agradables a la vista.
*   **Animaciones Fluidas y Nodos de Progreso:** Una "Timeline" interactiva que va desbloqueando el paso a paso algebraico o analítico de los ejercicios matemáticos a medida que el usuario avanza.
*   **Gráficos 2D Paramétricos con Chart.js:** Generación de funciones y áreas bajo la curva y Riemann directamente dibujados en canvas (y no usando imágenes estáticas).
*   **Experiencia Guiada (Driver.js):** Tutorial introductorio integrado de tipo "Guía de Turista" que asiste a un nuevo navegador web de la presentación.
*   **Ecuaciones de Nivel Profesional (MathJax):** Renderiza las fórmulas, integrales y símbolos complejos con formato LaTeX para que se vean como si provinieran de un libro de nivel universitario.

## 🗂️ Temáticas Desarrolladas

La plataforma está dotada con 5 temáticas distintas (basadas en los requerimientos de la asignatura):
1.  **Antiderivadas:** Explicación intensiva usando reglas de Linealidad y Trigonométricas (\(\int (t^2 + \sec^2 t)dt\)).
2.  **Sumas de Riemann:** Construcción desde sus cimientos algebraicos de los términos \(\Delta x\) y \(x_i\), mostrando evaluaciones subíndices y conclusiones de particiones al acercarse al infinito.
3.  **Integral Definida:** Paso a paso extendido de una división y evaluación polinomial apoyada en el Teorema Fundamental del Cálculo.
4.  **Aplicaciones Físicas:** Demostración gráfica, computacional y matemática de las diferencias entre el desplazamiento neto (Integral) y la distancia total métrica (Integral del Valor Absoluto) en una función de velocidad que cambia su sentido de curso.
5.  **Video de Sustentación:** Una interfaz de diapositivas tipo "Teleprompter" cronometrada que asiste al estudiante con guiones prefabricados para exponer la solución teórica del punto 4 de aplicaciones físicas en inglés y español durante menos de 8 minutos.

## 🚀 Despliegue Local Rápido

La aplicación requiere la carga de dependencias matemáticas y scripts en su `head`, e interactúa renderizando los gráficos en canvas, por lo cual **requiere ser ejecutada a través de un servidor local HTTP**.

En caso de tener node instalado, simplemente:

```bash
npx serve ./
```
Y visita `localhost:3000` en tu navegador de preferencia.
