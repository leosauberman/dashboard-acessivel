export interface Indicador {
    nome: string;
    campo: string;
    filtros: any[];
    tabela: string;
    descricao: string;
    eixo_x: string;
}

export const indicadores: Indicador[] = [
    {
        nome: "Proporção de nascidos vivos com alguma anomalia congênita",
        campo: "def_anomalia",
        filtros: [],
        tabela: "datasus-sinasc",
        eixo_x: "Anomalia congênita",
        descricao: "Proporção de nascidos vivos com anomalia congênita, de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266, em relação ao total de nascidos vivos.",
    },
    {
        nome: "Proporção de nascidos vivos com alguma anomalia congênita, por sexo",
        campo: "def_sexo",
        filtros: [{IDANOMAL: 1}],
        tabela: "datasus-sinasc",
        eixo_x: "Sexo",
        descricao: "Distribuição percentual dos nascidos vivos com alguma anomalia congênita (de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266), por sexo (masculino; feminino; ignorado)."
    },
    {
        nome: "Proporção de nascidos vivos com alguma anomalia congênita, por raça/cor",
        campo: "def_raca_cor",
        filtros: [{IDANOMAL: 1}],
        tabela: "datasus-sinasc",
        eixo_x: "Raça / Cor",
        descricao: "Proporção de nascidos vivos com anomalia congênita, de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266, em relação ao total de nascidos vivos."
    },
    {
        nome: "Proporção de nascidos vivos com alguma anomalia congênita, por escolaridade da mãe",
        campo: "def_escol_mae",
        filtros: [{IDANOMAL: 1}],
        tabela: "datasus-sinasc",
        eixo_x: "Escolaridade da Mãe",
        descricao: "Distribuição percentual dos nascidos vivos com alguma anomalia congênita (de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266), por escolaridade da mãe (Nenhuma; de 1 a 3 anos; de 4 a 7 anos; 8 a 11 anos; 12 anos e mais; Ignorado)."
    },
    {
        nome: "Percentual de nascidos vivos com alguma anomalia congênita, segundo número de consultas de pré-natal",
        campo: "def_consultas",
        filtros: [{IDANOMAL: 1}],
        tabela: "datasus-sinasc",
        eixo_x: "Consultas de Pré-Natal",
        descricao: "Distribuição percentual dos nascidos vivos com alguma anomalia congênita (de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266), por número de consultas de pré-natal realizadas pela mãe (1: Nenhuma; 2: de 1 a 3; 3: de 4 a 6; 4: 7 e mais; 9: Ignorado)."
    },
]
