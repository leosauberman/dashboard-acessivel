export interface Indicador {
    id: string;
    nome: string;
    campo: string[];
    filtros: any[];
    tabela: string;
    descricao: string;
    eixo_x: string;
}

export enum BaseIndicadorEnum {
    SINASC = "anomalia",
    BPC = "bpc"
}

export const indicadores: Indicador[] = [
    {
        id: "anomalia",
        nome: "Proporção de nascidos vivos com alguma anomalia congênita",
        campo: ["def_anomalia"],
        filtros: [],
        tabela: "datasus-sinasc",
        eixo_x: "Anomalia congênita",
        descricao: "Proporção de nascidos vivos com anomalia congênita, de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266, em relação ao total de nascidos vivos.",
    },
    {
        id: "anomalia_sexo",
        nome: "Proporção de nascidos vivos com alguma anomalia congênita, por sexo",
        campo: ["def_sexo"],
        filtros: [{IDANOMAL: ["1"]}],
        tabela: "datasus-sinasc",
        eixo_x: "Sexo",
        descricao: "Distribuição percentual dos nascidos vivos com alguma anomalia congênita (de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266), por sexo (masculino; feminino; ignorado)."
    },
    {
        id: "anomalia_raca_cor",
        nome: "Proporção de nascidos vivos com alguma anomalia congênita, por raça/cor",
        campo: ["def_raca_cor"],
        filtros: [{IDANOMAL: ["1"]}],
        tabela: "datasus-sinasc",
        eixo_x: "Raça / Cor",
        descricao: "Proporção de nascidos vivos com anomalia congênita, de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266, em relação ao total de nascidos vivos."
    },
    {
        id: "anomalia_escol",
        nome: "Proporção de nascidos vivos com alguma anomalia congênita, por escolaridade da mãe",
        campo: ["def_escol_mae"],
        filtros: [{IDANOMAL: ["1"]}],
        tabela: "datasus-sinasc",
        eixo_x: "Escolaridade da Mãe",
        descricao: "Distribuição percentual dos nascidos vivos com alguma anomalia congênita (de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266), por escolaridade da mãe (Nenhuma; de 1 a 3 anos; de 4 a 7 anos; 8 a 11 anos; 12 anos e mais; Ignorado)."
    },
    {
        id: "anomalia_consultas",
        nome: "Percentual de nascidos vivos com alguma anomalia congênita, segundo número de consultas de pré-natal",
        campo: ["def_consultas"],
        filtros: [{IDANOMAL: ["1"]}],
        tabela: "datasus-sinasc",
        eixo_x: "Consultas de Pré-Natal",
        descricao: "Distribuição percentual dos nascidos vivos com alguma anomalia congênita (de acordo com o Capitulo XVII da Classificação Internacional de Doenças (CID), códigos 254-266), por número de consultas de pré-natal realizadas pela mãe (1: Nenhuma; 2: de 1 a 3; 3: de 4 a 6; 4: 7 e mais; 9: Ignorado)."
    },
    {
        id: "bpc_avaliacao_ano",
        nome: "Distribuição percentual de pessoas com deficiência avaliadas para acesso ao BPC, por desfecho da avaliação e ano",
        campo: ["txt_tb_avaliacao_social.ano_avaliacao.keyword", "txt_tb_resultado_avaliacao.IN_RESULTADO_FAVORAVEL.keyword"],
        filtros: [],
        tabela: "cadastro_inclusao_bpc*",
        eixo_x: "Ano",
        descricao: "Distribuição percentual de pessoas com deficiência avaliadas para acesso ao Benefício de Prestação Continuada da Assistência Social (BPC), segundo desfecho (concedido ou não-concedido), por ano. "
    },
    {
        id: "bpc_sexo_ano",
        nome: "Distribuição percentual de pessoas com deficiência avaliadas para acesso ao BPC, por sexo e ano",
        campo: ["txt_tb_avaliacao_social.ano_avaliacao.keyword", "txt_tb_cadastro_beneficio.CS_SEXO.keyword"],
        filtros: [],
        tabela: "cadastro_inclusao_bpc*",
        eixo_x: "Sexo",
        descricao: "Distribuição percentual de pessoas avaliadas para acesso ao Benefício de Prestação Continuada da Assistência Social (BPC), por sexo (Feminino ou Masculino) e ano."
    },
    {
        id: "bpc_idade_ano",
        nome: "Distribuição percentual de pessoas com deficiência avaliadas para acesso ao BPC, por idade e ano",
        campo: ["txt_tb_avaliacao_social.ano_avaliacao.keyword", "idade_calculada"],
        filtros: [],
        tabela: "cadastro_inclusao_bpc*",
        eixo_x: "Idade",
        descricao: "Distribuição percentual de pessoas com deficiência avaliadas para acesso ao Benefício de Prestação Continuada da Assistência Social (BPC), por idade, por ano."
    },
    {
        id: "bpc_escol_ano",
        nome: "Distribuição percentual de pessoas com deficiência avaliadas para acesso ao BPC, por escolaridade e ano",
        campo: ["txt_tb_avaliacao_social.ano_avaliacao.keyword", "txt_tb_cadastro_beneficio.CS_GRAU_INSTRUCAO.keyword"],
        filtros: [],
        tabela: "cadastro_inclusao_bpc*",
        eixo_x: "Escolaridade",
        descricao: "Distribuição percentual de pessoas com deficiência avaliadas para acesso ao Benefício de Prestação Continuada da Assistência Social (BPC), por grau de escolaridade (1) sem escolaridade; (2) fundamental incompleto; (3) fundamental completo; (4) médio incompleto; (5) médio completo; (6) superior incompleto; (7) superior completo e mais, por ano."
    },
]

export const serializeCampo = (campo: string[]): string => campo.reduce((prev, curr) => prev.concat(curr), "");
