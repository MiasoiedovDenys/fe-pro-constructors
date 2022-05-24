import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */
export function Book(title, year, publicationBy, authors) {
    this.title = title;
    this.authors = authors;
    this.year = year;
    this.publicationBy = publicationBy;
    this.likedUsers = [];
    authors.forEach((author) => {
        author.books.push(this);
    });

    publicationBy.myBooks.push(this);

    Object.defineProperty(this, 'suggestedBooks', {
        get() {
            return this.authors.reduce((accum, { books }) => {
                const allBooks = books.filter((book) => book !== this);
                return [...new Set([...accum, ...allBooks])];
            }, []).join(', ');
        }
    });

    Object.defineProperty(this, 'suggestedPublicators', {
        get() {
            return this.authors.reduce((accum, { books }) => {
                const users = books.filter((user) => user !== this.publicationBy).map(({ name }) => name);

                return [...new Set([...accum, ...users])]
            }, []).join(', ');
        }
    });
}


const user = new User('Bohdan', 1893);
const book = new Book('1987', 2021, user, []);
