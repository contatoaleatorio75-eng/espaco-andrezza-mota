
import os
import sys
import random
from datetime import datetime
from google import genai

# --- CONFIGURAÇÃO DA SUA EMPRESA ---
CONFIG = {
    "nome_empresa": "Espaço Andrezza Mota",
    "links": {
        "natura": "https://minhaloja.natura.com/consultoria/andrezzamota",
        "boticario": "https://minhaloja.grupoboticario.com.br/espacoandrezzamota",
        "whatsapp": "https://wa.me/c/553197111424",
        "instagram": "https://www.instagram.com/espacoandrezzamota",
        "youtube": "@espacoandrezzamota"
    }
}

# Configura a chave da API (será pega dos Segredos do GitHub)
GENAI_API_KEY = os.environ.get("GEMINI_API_KEY")

# Lista de temas para variar o conteúdo
TEMAS = [
    "Cuidados essenciais com a pele no verão brasileiro",
    "Tendências de maquiagem para festas usando Eudora e Boticário",
    "Rotina de skincare antissinais com Natura Chronos",
    "Melhores perfumes nacionais que parecem importados (O.U.I e Boticário)",
    "Dicas de presentes sofisticados para datas especiais",
    "Como montar um spa day em casa com produtos Natura Ekos",
    "Cronograma capilar: recuperando o cabelo com Match Boticário",
    "Maquiagem leve para o dia a dia: tutorial rápido"
]

def gerar_artigo():
    if not GENAI_API_KEY:
        print("Aviso: GEMINI_API_KEY não encontrada no ambiente.")
        return "Erro: Chave de API não configurada.", "Erro"

    tema_escolhido = random.choice(TEMAS)
    print(f"Gerando artigo sobre: {tema_escolhido}...")

    # O Prompt Mestre com seus dados REAIS
    prompt = f"""
    Você é a Andrezza Mota, uma Consultora de Beleza Sênior experiente e amigável.
    Escreva um artigo de blog otimizado para SEO sobre: "{tema_escolhido}".

    REGRAS OBRIGATÓRIAS:
    1. Tom de voz: Acolhedor, especialista, focado em autoestima feminina.
    2. Estrutura: Título chamativo (H1), Introdução empática, Dicas em tópicos, Conclusão inspiradora.
    3. VITRINE DE VENDAS (IMPORTANTE):
       - Você DEVE sugerir produtos específicos das marcas Natura, Boticário, Eudora ou O.U.I.
       - Quando sugerir um produto, use EXATAMENTE este formato de tag para que meu site crie o botão de compra:
         [[CTA: MARCA | NOME DO PRODUTO]]
       - Exemplo: "Para hidratar, nada melhor que o [[CTA: NATURA | Hidratante Tododia Noz Pecã]]."
       - Se for Boticário: [[CTA: BOTICARIO | Malbec Gold]]
       - Se for Eudora: [[CTA: EUDORA | Siàge Reconstrói]]
    
    4. RODAPÉ DO ARTIGO:
       - No final, convide para seguir no Instagram ({CONFIG['links']['instagram']}) e tirar dúvidas no WhatsApp.

    Retorne apenas o conteúdo em Markdown.
    """

    try:
        client = genai.Client(api_key=GENAI_API_KEY)
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt
        )
        return response.text, tema_escolhido
    except Exception as e:
        print(f"Erro ao gerar conteúdo: {e}")
        return str(e), "Erro"

def salvar_arquivo(conteudo, titulo):
    # Cria slug amigável para URL (ex: cuidados-pele-verao)
    slug = titulo.lower().replace(" ", "-").replace(":", "").replace("ç", "c").replace("ã", "a")
    data_hoje = datetime.now().strftime("%Y-%m-%d")
    nome_arquivo = f"{data_hoje}-{slug}.md"
    
    # Define onde salvar (pasta '_posts' ou 'content' do Antigravity)
    # Supondo que usamos Next.js com dicionário de posts ou pasta 'content/posts'
    # Como não temos CMS, vamos salvar em 'content/posts' (que deve ser criada)
    diretorio_destino = "content/posts" 
    os.makedirs(diretorio_destino, exist_ok=True)
    
    caminho_completo = os.path.join(diretorio_destino, nome_arquivo)
    
    # Adiciona metadados (Frontmatter) que o site precisa
    conteudo_final = f"""---
title: "{titulo}"
date: "{data_hoje}"
author: "Andrezza Mota"
description: "Dicas exclusivas do Espaço Andrezza Mota sobre {titulo}."
---

{conteudo}
"""
    
    with open(caminho_completo, "w", encoding="utf-8") as f:
        f.write(conteudo_final)
    
    print(f"Sucesso! Artigo salvo em: {caminho_completo}")

if __name__ == "__main__":
    texto, titulo_tema = gerar_artigo()
    if titulo_tema != "Erro":
        salvar_arquivo(texto, titulo_tema)
    else:
        print("❌ ERRO FATAL: Não foi possível gerar o artigo.")
        sys.exit(1)
