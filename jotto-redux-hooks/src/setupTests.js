// create-react-app is configured to run 'setupTests'
// before each and every test if it is present

// This can be configured if we weren't using create-react-app
import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new EnzymeAdapter() });
