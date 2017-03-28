const chai = require( 'chai' );
const assert = chai.assert;
const request = require( 'request' );
var config = require( '../app/config' );
var GitHubApi = require( "github" );


var github = new GitHubApi( {
	debug: false
});
github.authenticate({
    type: "oauth",
    token: config.app_token
});

describe( 'githubapi test', () => {
    it.only( 'repos/:repo_name', done => {
        var data = {
            user: config.ml_dev,
            repo : 'interactive_project_template'
        };        
         try {
            github.repos.get( data, ( err, r ) => {
                if ( err ) {
                    console.log( err );
                } else {
                    var { id, name } = r;//66832320
                    console.log( id,name );
                    // console.log( 'repos.length:'+ r.length );
                    // r.forEach( element => console.log( element.full_name ) );
                }
                assert.strictEqual( name ,data.repo );//
                done();
            });
        }catch(e){

        }       
    });
    it( 'list all respo', done => {
        var data = {
            sort: "created",
            page: 1,
            per_page: 200
        };
        github.repos.getAll( data, ( err, r ) => { 
            if ( err ) {
                console.error( err );
            }
            var filterArr = [];
            r.forEach(( element ) => {
                var { id, name } = element;
                console.log(id,name);
                filterArr.push( { id, name } );
            })
            console.log(filterArr);
            done();
        } );
    } );
    it.skip( 'delete', ( done ) => {
        try {
            var data = {
                owner: config.ml_dev,
                repo: '2016_11_test'
            };
            github.repos.delete( data, ( err, res ) => {
                if ( err )
                    console.log( err );
                if ( res )
                    console.log( res );
                done();
            });
            
        } catch (error) {
            
        }
        
    });
    it.skip( 'addCollaborator', done => {
        function addCollaborator( repo, collabuser ) {
            console.log( 'addCollaborator' , repo , collabuser );
            var data = {
                user: config.ml_dev,
                owner: config.ml_dev,
                repo: repo,
                collabuser: collabuser
            };
            return new Promise((resolve, reject) => {
                github.repos.addCollaborator( data, ( err, res ) => err ? reject( err ) : resolve( res ) );            
            });
        }        
        try {
            var userArr = [ config.ml_users[ 0 ].githubName ];
            for (var i = 0; i < config.ml_users.length; i++) {                
                userArr.push( config.ml_users[ i ].githubName );
            }
            var repo = '2016_11_test';
            var c = [];
            for (var i = 0; i < userArr.length; i++) {
                c[i] = addCollaborator(repo, userArr[i]);
            }
            Promise.all( c ).then( r => {
                console.log( r );
                done();
                // res.json( r );
            }).catch( err => {
                done();
                // res.json( { error: err });
            });
        } catch (error) {
            
        }
      
    });


    it.skip( 'create', done => {
        let name = '2016_11_test';
        let description = 'test description';        
        var data = {
            'name': name,
            'description': description,
            'private': true
        };
        // res.json( {name:name})
        try {
            github.repos.create( data, ( err, r ) => {
                if ( err ) {
                    console.log( err.message );    
                }
                if(r)
                    console.log( r );
                done();
            } );
        } catch ( e ) {
            
        }        
    });
    
 
    it.skip( 'repos', done => {
        var data = {
            sort: "created",
            page: 1,
            per_page:20
        };
        try {
            github.repos.getAll( data, ( err, r ) => {
                if ( err ) {
                    console.log( err );
                } else {
                    console.log( 'repos.length:'+ r.length );
                    r.forEach( element => console.log( element.full_name ) );
                }
                assert.equal( true , !!r , '======================================================');
                done();
            });
        }catch(e){

        }       
    });

    
});