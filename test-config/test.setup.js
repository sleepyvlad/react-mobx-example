const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-17-updated');

Enzyme.configure({ adapter: new Adapter() });

console.error = (message) => {
    throw new Error(message);
};
