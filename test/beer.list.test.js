// Configure the environment
const env = process.env.NODE_ENV || "test";
const config = require("../knexfile")[env];
const server = require("../server/index");
const knex = require("knex")(config);

// Library
const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// For test
const PATH = "/api/beer";

// Firth Migrate Test
describe("routes of beer", () => {
    beforeEach(() => {
        return knex.migrate.rollback()
            .then(() => {
                return knex.migrate.latest();
            })
            .then(() => {
                return knex.seed.run();
            });
    })

    afterEach(() => {
        return knex.migrate.rollback();
    })

    // Test Case

    // Firth Case
    describe('Try to Get /api/beer', () => {
        it('check first beer', done => {
            chai
                .request(server)
                .get(PATH)
                .end((err, res) => {
                    res.body.data.length.should.eql(3);
                    res.body.data[0].id.should.eql(1);
                    res.body.data[0].name.should.eql('Another one');
                    done();
                })
        })

        it('should return all beer from database', done => {
            chai
                .request(server)
                .get(PATH)
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.data.length.should.eql(3);
                    res.body.data[0].should.include.keys(
                        'id',
                        'name',
                        'description',
                        'brand'
                    );
                    done();
                })
        })
    })

    describe('RUN TEST ID /api/beer/:id', () => {
        it('check first beer', done => {
            chai
                .request(server)
                .get('/api/beer/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(200);
                    res.type.should.eql('application/json');
                    res.body.data.length.should.eql(1);
                    res.body.data[0].id.should.eql(1);
                    res.body.data[0].name.should.eql('Another one');
                    done();
                })
        })

        it('Data not found', done => {
            chai
                .request(server)
                .get('/api/beer/50')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.eql(404);
                    res.type.should.eql('application/json');
                    done();
                })
        })
    });




});