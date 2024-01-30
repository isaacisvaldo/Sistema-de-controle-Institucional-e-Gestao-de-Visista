Modelo de entidade e relacionamento do Sistema de gestão de visitas e segurança Inst. do MININT.
tb_posicoes_escalados(id, designacao)
tb_pelotoes(id, designacao)
tb_turnos(id, designacao)
tb_postos(id, designacao)
tb_tipos_de_escala(id, designacao)
tb_situacao_funcionarios(id, designacao)
tb_situacao_visitante (id, designacao).
Obs:valores designacao: recepcionado, encaminhado, atendido, despachado
tb_tipos_doc_identificacao_visitante(id_identifi, designacao) 
Obs:valores designacao: BI, Passaporte e Carta de identificação
tb_orgaos_policiais(id, designacao)
tb_patentes(id, designacao, fk_orgao_policial)
tb_categoria_area(id, desiginacao)
Obs:valores designacao: Direcção, Departamento, Secção
tb_grupo_user(id, designacao) ?
tb_perfil(id, designicao) ?
tb_contacto(id, designacao)
Obs:valores designacao podem ser numeros de telefones, emais ou qualquer tipo de contacto
tb_anexos(id, nome_anexo, tipo)
tb_pertences(id, designacao)
tb_tipo_visita(id, designacao) 
Obs:valores designacao: visita pessoal, visita de serviço
tb_area(id, nome_area, sigla, fk_cat_area, fk_area_superior)
tb_funcionario(id, nome, sobrenome, fk_patente, fk_area, fk_situacao_funcionario, NIP, 
chef_de_area, fk_user)
Obs:valores situação - disponivel ou indisponivel; valores chefe de area - sim/não, fk_user -null
tb_funcionario_contacto(fk_funcionario, fk_contacto) 
tb_efectivos_pelotao (fk_funcionario, fk_pelotao)
tb_escala(id, mes, ano, fk_tipo_de_escala)
tb_escala_de_permanecas(fk_funcionario, fk_escala, dia, d_semana, posicao)
tb_escala_de_deia_pm_cctv(fk_funcionario, fk_escala, dia, d_semana)
tb_escala_de_pelotoes(fk_pelotao, fk_escala, dia, d_semana, id)
tb_escala_de_pelotao_postos(fk_escala_de_pelotoes, fk_funcionario, fk_posto, 
fk_turno)
tb_users(id, fk_anexo, username, email, password, fk_perfil, fk_grupo,
fk_responsavel_pelo_cadastro, estado)
tb_visitante(id, nome, sobrenome)
tb_visitante_contacto(fk_visitante, fk_contacto)
tb_visitante_identificacao(fk_visitante, num_identificacao, fk_tipo_identificacao, 
validade, fk_anexo)
tb_visita (id, dt_visita, hora_entrada, hora_saida, fk_area_visitada, fk_tipo_visita)
tb_visita_visitante(fk_visita, fk_visitante, fk_tp_identificacao, num_passe_acesso, 
fk_situacao_visitante)
tb_visita_visitante_pertences (fk_visita, fk_visitante, fk_pertence)
Pendentes:
Tb_ocorrencias
Tb_log