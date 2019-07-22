import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//import { toast } from 'react-toastify';
import requiresLogin from '../requires-login';
import { editLink, fetchUserLinks } from '../../actions/links';
import { fetchUserCategories } from '../../actions/categories';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import LinkForm from '../link-form';

const EditLink = ({ dispatch, linksLoading, categoriesLoading, error, links, match, history }) =>  {    

   useEffect(() => {
       dispatch(fetchUserCategories());
   }, []);
    
    const getLink = (id) => {        
        if (!links) return;
        const link = links.find(lnk => lnk._id === id);         
        return link;
    }

    const submitLink  = (url, category, title, note) => {
        dispatch(editLink({
            id: match.params.linkId,
            url,
            category,
            title,
            note
        })).then(() => {
           history.push('/dashboard');
            // if (!error) {
            //     toast.success('Link saved successfully!', {
            //         position: toast.POSITION.TOP_CENTER
            //     });
            //     history.goBack();
            // }
        })
          .catch(error => console.error("ERROR", error));        
    }

   
    const linkId = match.params.linkId;
    
    if (linksLoading || categoriesLoading){                      
        return <LoadingSpinner />
    }

    const link = getLink(linkId);
    if (!link) {
        return <div className="container alert alert-danger">Unble to locate link</div>
    }

    return (       
        <div className="container">
            <h3 className="link-header">Edit Link</h3>
            {error &&
                <div className="container alert-alert-danger">{error.message}</div>
            }
            <LinkForm link={link} onSubmitLink={(url, category, title, note) => submitLink(url, category, title, note)} />
        </div>
    ); 

};

const mapStateToProps = state => ({    
    authToken: state.auth.authToken,                      
    links: state.userLinks.links,
    linksLoading: state.userLinks.loading,      
    error: state.userLinks.error,    
    categories: state.categories.categories,
    categoriesLoading: state.categories.loading
});

export default requiresLogin()(connect(mapStateToProps)(EditLink));