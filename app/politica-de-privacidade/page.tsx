import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-serif font-bold text-am-black mb-8">Política de Privacidade</h1>

            <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
                <p>
                    A sua privacidade é importante para nós. É política do <strong>Espaço Andrezza Mota</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <Link href="/" className="text-am-green underline">Espaço Andrezza Mota</Link>, e outros sites que possuímos e operamos.
                </p>

                <h2 className="text-xl font-bold text-am-black mt-6">Google AdSense e Cookies DoubleClick</h2>
                <p>
                    O Google, como fornecedor de terceiros, utiliza cookies para exibir anúncios no nosso site. O uso do cookie DoubleClick pelo Google permite que ele e seus parceiros exibam anúncios para nossos usuários com base em sua visita ao nosso site e/ou a outros sites na Internet.
                </p>
                <p>
                    Os usuários podem optar por sair do uso do cookie DoubleClick para publicidade baseada em interesses visitando as <a href="https://adssettings.google.com/authenticated" target="_blank" rel="nofollow noreferrer" className="text-am-green underline">Configurações de Anúncios do Google</a>.
                </p>

                <h2 className="text-xl font-bold text-am-black mt-6">Cookies de Publicidade</h2>
                <p>
                    Utilizamos publicidade de terceiros no nosso site para suportar os custos de manutenção. Alguns destes publicitários (como o Google AdSense) poderão utilizar tecnologias como os cookies e/ou web beacons quando publicitam no nosso site, o que fará com que esses publicitários (como o Google) também recebam a sua informação pessoal, como o endereço IP, o seu ISP, o seu browser, etc.
                </p>
                <p>
                    Esta função é geralmente utilizada para geotargeting (mostrar publicidade de Belo Horizonte apenas aos leitores oriundos de Belo Horizonte por ex.) ou apresentar publicidade direcionada a um tipo de utilizador (como mostrar publicidade de restaurante a um utilizador que visita sites de culinária regularmente).
                </p>

                <h2 className="text-xl font-bold text-am-black mt-6">Compromisso do Usuário</h2>
                <p>
                    O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Espaço Andrezza Mota oferece no site e com caráter enunciativo, mas não limitativo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
                    <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou casas de apostas, jogos de sorte e azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
                    <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Espaço Andrezza Mota, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
                </ul>

                <h2 className="text-xl font-bold text-am-black mt-6">Mais informações</h2>
                <p>
                    Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                </p>
                <p className="border-t border-gray-200 pt-6 mt-8 text-sm">
                    Esta política é efetiva a partir de <strong>Janeiro/2026</strong>.
                </p>
            </div>

            <div className="mt-8">
                <Link href="/" className="text-am-green font-semibold hover:underline">&larr; Voltar para a Home</Link>
            </div>
        </main>
    );
}
