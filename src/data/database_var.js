export const json ={
    "categories": [
        {
            "name": "Categoría A",
            "subcategories": [
                {
                    "name": "Subcategoría A1",
                    "subcategories": [
                        {
                            "name": "Subcategoría A1.1",
                            "subcategories": [],
                            "concepts": [
                                {
                                    "keyword": "Concept1",
                                    "definitions": [],
                                    "relations": [],
                                    "fakeKeywords": []
                                }
                            ],
                            "questions": [
                                {
                                    "conceptKey": "Concept1",
                                    "statement": "Qué es el Concept1",
                                    "target": "Definition",
                                    "type": "Open",
                                    "answers": []
                                },
                                {
                                    "conceptKey": "Concept1",
                                    "statement": "Que tipos de Concept1 podemos decir que hay",
                                    "target": "Classification",
                                    "type": "Open",
                                    "answers": [
                                        {
                                            "username": "Estudiante1",
                                            "content": "ConceptA y ConceptB",
                                            "isOK": false,
                                            "createdDate": "2023-12-15T18:22:52.349Z",
                                            "evaluatedBy": "",
                                            "evaluatedDate": null
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "Subcategoría A1.2",
                            "subcategories": [
                                {
                                    "name": "Subcategoría A1.2.1",
                                    "subcategories": [],
                                    "concepts": [
                                        {
                                            "keyword": "Concept2",
                                            "definitions": [],
                                            "relations": [],
                                            "fakeKeywords": []
                                        }
                                    ],
                                    "questions": [
                                        {
                                            "conceptKey": "Concept2",
                                            "statement": "Que es un Concept2",
                                            "target": "Definition",
                                            "type": "Open",
                                            "answers": [
                                                {
                                                    "username": "Estudiante2",
                                                    "content": "RespuestaDefinicion",
                                                    "isOK": false,
                                                    "createdDate": "2024-01-16T11:01:25.681Z",
                                                    "evaluatedBy": "",
                                                    "evaluatedDate": null
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "concepts": [],
                            "questions": []
                        }
                    ],
                    "concepts": [],
                    "questions": []
                },
                {
                    "name": "Subcategoría A2",
                    "subcategories": [],
                    "concepts": [
                        {
                            "keyword": "Concept3",
                            "definitions": [],
                            "relations": [],
                            "fakeKeywords": []
                        }
                    ],
                    "questions": []
                },
                {
                    "name": "Subcategoría A3",
                    "subcategories": [],
                    "concepts": [
                        {
                            "keyword": "Concept4",
                            "definitions": [],
                            "relations": [],
                            "fakeKeywords": []
                        }
                    ],
                    "questions": [
                        {
                            "conceptKey": "Concept4",
                            "statement": "Que es Concept4",
                            "target": "Definition",
                            "type": "Open",
                            "answers": [
                                {
                                    "username": "Estudiante3",
                                    "content": "RespuestaDefinicion",
                                    "isOK": false,
                                    "createdDate": "2024-01-16T11:18:21.237Z",
                                    "evaluatedBy": "",
                                    "evaluatedDate": null
                                }
                            ]
                        }
                    ]
                }
            ],
            "concepts": [
                {
                    "keyword": "Concept5",
                    "definitions": [
                        {
                            "content": "Definicion1",
                            "isFake": false,
                            "createdDate": "2023-11-16T08:50:10.864Z",
                            "justifications": []
                        },
                        {
                            "content": "Definicion2",
                            "isFake": true,
                            "createdDate": "2023-11-24T19:21:16.631Z",
                            "justifications": []
                        }
                    ],
                    "relations": [],
                    "fakeKeywords": []
                },
                {
                    "keyword": "Concept6",
                    "definitions": [],
                    "relations": [],
                    "fakeKeywords": []
                },
                {
                    "keyword": "Concept7",
                    "definitions": [
                        {
                            "content": "Definicion3",
                            "isFake": false,
                            "createdDate": "2023-12-01T12:00:05.182Z",
                            "justifications": []
                        },
                        {
                            "content": "Definicion4",
                            "isFake": true,
                            "createdDate": "2023-12-01T12:10:21.000Z",
                            "justifications": []
                        }
                    ],
                    "relations": [],
                    "fakeKeywords": []
                }
            ],
            "questions": [
                {
                    "conceptKey": "Concept5",
                    "statement": "Qué es el Concept5",
                    "target": "Definition",
                    "type": "Open",
                    "answers": [
                        {
                            "username": "Estudiante1",
                            "content": "Definicion2",
                            "isOK": false,
                            "createdDate": "2023-11-15T13:35:58.467Z",
                            "evaluatedBy": "Docente1",
                            "evaluatedDate": "2023-11-24T19:21:16.631Z"
                        },
                        {
                            "username": "Estudiante2",
                            "content": "Definicion1",
                            "isOK": true,
                            "createdDate": "2023-11-15T13:36:32.514Z",
                            "evaluatedBy": "Docente1",
                            "evaluatedDate": "2023-11-16T08:49:10.864Z"
                        }
                    ]
                },
                {
                    "conceptKey": "Concept5",
                    "statement": "Que tipos de Concept5 hay",
                    "target": "Classification",
                    "type": "Open",
                    "answers": [
                        {
                            "username": "Estudiante2",
                            "content": "ConceptD y ConceptE",
                            "isOK": false,
                            "createdDate": "2023-11-17T17:51:38.068Z",
                            "evaluatedBy": "",
                            "evaluatedDate": null
                        }
                    ]
                },
                {
                    "conceptKey": "Concept5",
                    "statement": "De que se compone Concept5",
                    "target": "Composition",
                    "type": "Open",
                    "answers": [
                        {
                            "username": "Estudiante2",
                            "content": "ConceptF, ConceptG, ConceptH",
                            "isOK": false,
                            "createdDate": "2023-11-24T19:01:13.194Z",
                            "evaluatedBy": "",
                            "evaluatedDate": null
                        }
                    ]
                },
                {
                    "conceptKey": "Concept6",
                    "statement": "Que es una Concept6",
                    "target": "Definition",
                    "type": "Open",
                    "answers": [
                        {
                            "username": "Estudiante1",
                            "content": "Definicion6",
                            "isOK": false,
                            "createdDate": "2023-11-20T18:41:51.038Z",
                            "evaluatedBy": "",
                            "evaluatedDate": null
                        }
                    ]
                },
                {
                    "conceptKey": "Concept7",
                    "statement": "Que es un Concept7",
                    "target": "Definition",
                    "type": "Open",
                    "answers": [
                        {
                            "username": "Estudiante3",
                            "content": "RespuestaDefinicion7",
                            "isOK": true,
                            "createdDate": "2023-12-01T11:55:23.350Z",
                            "evaluatedBy": "Docente2",
                            "evaluatedDate": "2023-12-01T12:00:05.181Z"
                        },
                        {
                            "username": "Estudiante1",
                            "content": "RespuestaDefinicion8",
                            "isOK": false,
                            "createdDate": "2023-12-01T11:57:55.802Z",
                            "evaluatedBy": "Docente2",
                            "evaluatedDate": "2023-12-01T12:10:21.000Z"
                        }
                    ]
                },
                {
                    "conceptKey": "Concept7",
                    "statement": "Que tipos de Concept7 hay",
                    "target": "Classification",
                    "type": "Open",
                    "answers": []
                }
            ]
        },
        {
            "name": "Categoría B",
            "subcategories": [],
            "concepts": [
                {
                    "keyword": "Concept8",
                    "definitions": [],
                    "relations": [],
                    "fakeKeywords": []
                }
            ],
            "questions": [
                {
                    "conceptKey": "Concept8",
                    "statement": "Que son los Concept8",
                    "target": "Definition",
                    "type": "Open",
                    "answers": []
                }
            ]
        },
        {
            "name": "Categoría C",
            "subcategories": [
                {
                    "name": "Subcategoría C1",
                    "subcategories": [],
                    "concepts": [
                        {
                            "keyword": "Concept9",
                            "definitions": [],
                            "relations": [],
                            "fakeKeywords": []
                        }
                    ],
                    "questions": [
                        {
                            "conceptKey": "Concept9",
                            "statement": "¿Que indican las Concept9?",
                            "target": "Definition",
                            "type": "Open",
                            "answers": []
                        },
                        {
                            "conceptKey": "Concept9",
                            "statement": "¿Que tipos de Concept9 hay?",
                            "target": "Classification",
                            "type": "Open",
                            "answers": []
                        }
                    ]
                }
            ],
            "concepts": [],
            "questions": []
        }
    ]
}