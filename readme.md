# PROYECTO TESTLABORA 
 
### PROPUESTA INICIAL DE PROYECTO

Se propone una aplicación que servirá de herramienta para recopilar preguntas tipo Test para la autoevaluación de alumnos. Debe contemplar una manera sencilla para recopilar las preguntas de distintas fuentes y ofrecer consejos para facilitar la creación de preguntas en dispositivos móviles.

El usuario podrá componer conjuntos de preguntas en un Test que podrá ejecutar para autoevaluarse, obtener resultados y marcar las preguntas falladas para poder componer otro test de fallos.

Se propone la posibilidad de formar una comunidad de usuarios para compartir estas preguntas, catalogarlas y marcar las revisiones realizadas por usuarios autorizados en la categoría del conocimiento concreto de la pregunta.

### REPLANTEO:

La finalidad de la aplicación es hacer preguntas y recopilar respuestas,
para generar finalmente un test, que será una serie de cuestiones a partir de unos cuantos conceptos.

<!-- [overview]
<img src="./out/doc/planteamiento_secuencia/OpoTestPlanteamiento.svg"> -->

## DOMINIO

[domain]
<img src="./out/doc/dominio_clases/OpoTestDomain.svg">

### Detalle : Definiendo Conceptos a través de Preguntas Abiertas

Incialmente un editor-revisor propone una categoría y añade el indice del temario como categorías hijas, para que los editores puedan ir abriendo preguntas y aportando posibles definiciones, justificaciones y relaciones, que tendrá que corregir un revisor para añadir al concepto.
Conforme se complete un concepto se abre la posibilidad de generar preguntas de tipo test.

<img src="./out/doc/categoryStates/CategoryStates.svg">

### Elaboración de un Concepto

<img src="./out/doc/conceptStates/ConceptStates.svg">

[domain detail]
<img src="./out/doc/dominio_detail_concept/ConceptDomainDetail.svg">

Algunos tipos de preguntas según el nivel de elementos usados del concepto:

1. Nivel 1 - solo la palabre clave (keyword)

DefinitionQuestion:
 * Statement: "¿Qué es KEYWORD?"
 * Answer: OPEN
 * Manual correction
With Relations - Classification 
  * Statement: "¿Cuáles son los tipos de KEYWORD?"
  * Answer: OPEN

ClassQuestion:
 * Statement: "¿Qué tipos hay de KEYWORD?"
 * Answer: OPEN
 
2. Nivel 2 - palabra clave y definiciones

JustificationQuestion:
 * Statement: "¿La KEYWORD es esta REALDEFINITION?¿Por qué?"
 * Answer: OPEN

WithDefinitionAutomatic: 
  * Statement: "¿Qué es KEYWORD?"
  * Correct Answer: REALDEFINITION
  * 3 Incorrects Answers: 3 FAKEDEFINITION

ReverseDefinitionQuestion (2 levels)
  * Statement: "¿Qué es DEFINITION?"
  * Correct: KEYWORD
  * 3 Incorrects: 3 FAKE KEYWORDS

- With Definition Multiple
  * Statement: " Señala las definiciones correctas: A,B,..."
  * Automatic

3. Nivel 3 - palabra clave definiciones y justificaciones.


With Justification (3 levels)
  * Statement: "¿Es cierto que KEYWORD no es FAKEDEFINITION porque FAKEJUSTIFICATION"
  * Automatic

  
## Casos de uso

* Caso de uso principal del editor es meter conceptos con definiciones, correctas o incorrectas, así como justificaciones y relaciones.
* Caso de uso principal del revisor es decidir si las definiciones son correctas o incorrectas y relacionarlas con los conceptos.
* Caso de uso generación test será la generación de cuestiones a partir de unos cuantos conceptos.

[useCases]
<img src="./out/doc/useCases_app/useCases_app.svg">


## Referencias

-UML-Quiz: 
Autor: https://vonfranque.com/ (Universidad de Viena)
https://publik.tuwien.ac.at/files/PubDat_237457.pdf

-Webs de test oposiciones

https://www.daypo.com  
http://OpositaTest.com  
http://hacertest.com  
http://Oposito.es  

https://opexams.com/es/ai-quiz-generator/#solution-features

https://testualia.com/test-online-con-inteligencia-artificial/

https://parafrasist.com/creador-de-cuestionarios

https://pregunta2.com/crear




## Decálogo para crear preguntas:
https://www.evolmind.com/blog/como-crear-examen-tipo-test-las-6-herramientas-que-triunfan/

1.Centra cada pregunta del examen en el contenido que realmente es importante.

2.Evita redactar las cuestiones tal cual aparecen en los apuntes de clase. La idea es averiguar si el alumno ha comprendido los conceptos y ciertamente entiende sobre qué se le está preguntando.

3.Elabora preguntas cortas, nada de verborrea ni largas lecturas.

4.Utiliza un lenguaje simple y acorde a tu grupo de alumnos.

5.Cuida la ortografía y gramática. Como sabes, el uso inadecuado de un signo de puntuación o una frase mal construida pueden dar a entender otro significado.

6.Sugiere, de ser posible, tres opciones de respuesta y comprueba que solo una sea la correcta.

7.Formula las preguntas en positivo. De usar negativas, resáltalas con mayúscula y negrita.

8.Cambia el orden en que aparece la respuesta correcta. Por ejemplo, si en la pregunta 1 la respuesta correcta es la ‘A’, en la 2 haz que sea la ‘B’ o la ‘C’.

9.Prescinde de respuestas muy absurdas y ridículas.

10.Aporta un toque de humor si ves que encaja con tu perfil de alumnos.




