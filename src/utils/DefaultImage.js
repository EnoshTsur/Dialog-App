// Closure that contains tha default image path
function DefaultImage() {

    const defaultImage = 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';

    const getImage = () => defaultImage;

    return {
        getImage
    }
}

const defaultImage = new DefaultImage();

export default defaultImage.getImage();