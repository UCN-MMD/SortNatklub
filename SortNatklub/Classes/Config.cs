using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SortNatklub
{
    /// <summary>
    /// Provides access to the application's default configuration.
    /// </summary>
    public static class Config
    {
        /// <summary>
        /// Gets the connection string at the specified index in the collection.
        /// </summary>
        /// <param name="index">The index of a System.Configuration.ConnectionStringSettings object in the collection.</param>
        /// <returns></returns>
        /// <exception cref="System.NullReferenceException"></exception>
        /// <exception cref="System.Configuration.ConfigurationErrorsException"></exception>
        public static string ConnectionString(int index)
        {
            return ConfigurationManager.ConnectionStrings[index].ConnectionString;
        }

        /// <summary>
        /// Gets the connection string with the specified name in the collection.
        /// </summary>
        /// <param name="name">The name of a System.Configuration.ConnectionStringSettings object in the collection.</param>
        /// <returns></returns>
        /// <exception cref="System.NullReferenceException"></exception>
        /// <exception cref="System.Configuration.ConfigurationErrorsException"></exception>
        public static string ConnectionString(string name)
        {
            return ConfigurationManager.ConnectionStrings[name].ConnectionString;
        }

        /// <summary>
        /// Used to get a string from the application's default configuration.
        /// </summary>
        /// <param name="key">The key of the entry to locate. The key is case-insensitive and can be null.</param>
        /// <returns></returns>
        /// <exception cref="System.Configuration.ConfigurationErrorsException"></exception>
        public static string AppSetting(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        /// <summary>
        /// Used to get a string from the application's default configuration.
        /// </summary>
        /// <param name="key">The key of the entry to locate. The key is case-insensitive and can be null.</param>
        /// <param name="defaultValue">The default value to return, if the key doesn't exist.</param>
        /// <returns></returns>
        /// <exception cref="System.Configuration.ConfigurationErrorsException"></exception>
        public static string AppSetting(string key, string defaultValue)
        {
            return AppSetting<string>(key, defaultValue);
        }

        /// <summary>
        /// Used to get a strongly typed value from the application's default configuration.
        /// <para>
        /// If the key doesn't exist in the configuration file, the specified default value is returned.
        /// </para>
        /// </summary>
        /// <typeparam name="T">The type of object to return.</typeparam>
        /// <param name="key">The key of the entry to locate. The key is case-insensitive and can be null.</param>
        /// <param name="defaultValue">The default value to return, if the key doesn't exist.</param>
        /// <returns></returns>
        /// <exception cref="System.InvalidCastException"></exception>
        /// <exception cref="System.FormatException"></exception>
        /// <exception cref="System.OverflowException"></exception>
        /// <exception cref="System.ArgumentNullException"></exception>
        /// <exception cref="System.Configuration.ConfigurationErrorsException"></exception>
        public static T AppSetting<T>(string key, T defaultValue)
        {
            string value = ConfigurationManager.AppSettings[key];
            if (value == null)
                return defaultValue;
            return (T)Convert.ChangeType(value, typeof(T));
        }

        /// <summary>
        /// Used to get a strongly typed value from the application's default configuration.
        /// </summary>
        /// <typeparam name="T">The type of object to return.</typeparam>
        /// <param name="key">The key of the entry to locate. The key is case-insensitive and can be null.</param>
        /// <returns></returns>
        /// <exception cref="System.InvalidCastException"></exception>
        /// <exception cref="System.FormatException"></exception>
        /// <exception cref="System.OverflowException"></exception>
        /// <exception cref="System.ArgumentNullException"></exception>
        /// <exception cref="System.Configuration.ConfigurationErrorsException"></exception>
        public static T AppSetting<T>(string key)
        {
            string value = ConfigurationManager.AppSettings[key];
            return (T)Convert.ChangeType(value, typeof(T));
        }
    }
}