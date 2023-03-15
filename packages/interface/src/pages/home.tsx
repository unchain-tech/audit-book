import Div100vh from 'react-div-100vh';
import { RedirectIfOwnedNFT } from 'src/components/elements/RedirectIfOwnedNFT';
import { Footer } from 'src/components/layouts/Footer';
import { Header } from 'src/components/layouts/Header';
import { Main } from 'src/components/layouts/Main';
import { MainHome } from 'src/components/layouts/Main/MainHome';

export const Home = () => {
    return (
        <RedirectIfOwnedNFT>
            <Div100vh>
                <Header />
                <Main>
                    <MainHome />
                </Main>
                <Footer />
            </Div100vh>
        </RedirectIfOwnedNFT>
    );
};
