'use strict';

/**
 * Provides a simpler interface to the browser's Local Storage
 *
 * Taken from http://www.bennadel.com/blog/2105-exploring-html5-s-localstorage-persistent-client-side-key-value-pairs.htm
 * Simple interface to localStorage
 *
 * The localStorage option has some limitations both in the
 * way that it treats values and in the way that it checks
 * for existence. As such, this Cache object will provide
 * a better proxy.
 *
 * ngtype: factory
 *
 * @namespace general
 * @class LocalStorage
 * @constructor
 */
angular.module('ozpWebtopApp.general').factory('LocalStorage', function() {

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //            Simple interface to browser's localStorage
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // TODO: make self-executing?
  var localCache = function( nativeStorage, objSerializer ){

    // Store the native storage reference as the object that
    // we are going to proxy. This object must uphold the
    // HTML5 Storage interface.
    var storage = nativeStorage || localStorage;

    // Store the serialization behavior. This object must
    // uphold the JSON interface for serialization and
    // deserialization.
    var serializer = objSerializer || JSON;

    return {
      /**
       * I clear the cache
       * @method clear
       * @returns {localCache}
       */
      clear: function(){
        // Clear the storage container.
        storage.clear();

        // Return this object reference for method chaining.
        return( this );
      },
      /**
       * I get an item from the cache. If the item cannot be
       *  found, I can pass back an optional default value
       * @method getItem
       * @param key
       * @param defaultValue
       * @returns {*}
       */
      getItem: function( key, defaultValue ){
        // Get the cached item.
        var value = storage.getItem( key );

        // Check to see if it exists. If it does, then we
        // need to deserialize it.
        if (value === null){

          // No cached item could be found. Now, we either
          // have to return the default value, or we have
          // to return Null. We have to be careful here,
          // though, because the default value might be a
          // falsy.
          return(
            (typeof( defaultValue ) !== 'undefined') ?
                defaultValue :
                null
          );

        } else {

          // The value was found; return it in its
          // original form.
          return(
            serializer.parse( value )
          );
        }
      },
      /**
       * I check to see if the given key exists in the storage container
       * @method hasItem
       * @param key
       * @returns {boolean}
       */
      hasItem: function( key ){
        // Simply check to see if the key access results in a
        // null value.
        return(
          storage.getItem( key ) !== null
        );
      },
      /**
       * I remove the given item from the cache
       * @method removeItem
       * @param key
       * @returns {localCache}
       */
      removeItem: function( key ){
        // Remove the key from the storage container.
        storage.removeItem( key );

        // Return this object reference for method chaining.
        return( this );
      },
      /**
       * I store the item in the cache. When doing this, I automatically
       * serialize the value.
       *
       * NOTE: Not all value (ex. functions and private variables) will
       * serialize.
       *
       * @method setItem
       * @param key
       * @param value
       * @returns {localCache}
       */
      setItem: function( key, value ) {
        // Store the serialize value.
        storage.setItem(
          key,
          serializer.stringify( value )
        );

        // Return this object reference for method chaining.
        return( this );
      }
    };
  };

  return localCache;
});